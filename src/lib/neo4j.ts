import neo4j, { Driver, isInt } from 'neo4j-driver';

const uri = process.env.NEO4J_URI || 'bolt://localhost:7687';
const username = process.env.NEO4J_USERNAME || 'neo4j';
const password = process.env.NEO4J_PASSWORD || 'password';

let driver: Driver;

if (process.env.NODE_ENV === 'production') {
  driver = neo4j.driver(uri, neo4j.auth.basic(username, password));
} else {
  // Prevent duplicate connections during hot reloading in development
  const globalWithNeo4j = global as typeof globalThis & {
    _neo4jDriver?: Driver;
  };
  if (!globalWithNeo4j._neo4jDriver) {
    globalWithNeo4j._neo4jDriver = neo4j.driver(uri, neo4j.auth.basic(username, password));
  }
  driver = globalWithNeo4j._neo4jDriver;
}

export { driver };

/**
 * Recursively converts Neo4j data structures (Integers, Nodes, Relationships)
 * into plain JavaScript objects suitable for React components and Next.js Server Actions.
 */
export function toNative(value: any): any {
  if (value === null || value === undefined) {
    return value;
  }

  // Handle Neo4j custom Integer
  if (isInt(value)) {
    return value.toNumber();
  }

  // Handle Arrays
  if (Array.isArray(value)) {
    return value.map(toNative);
  }

  // Handle Neo4j Node or Relationship objects which store data in the 'properties' field
  if (typeof value === 'object') {
    if ('properties' in value && typeof value.properties === 'object') {
      const nativeProps = toNative(value.properties);
      // For convenience, also include standard node identifiers if present
      if ('identity' in value && value.identity !== null) {
        nativeProps._dbId = toNative(value.identity);
      }
      if ('elementId' in value && value.elementId !== null) {
        nativeProps._elementId = value.elementId;
      }
      return nativeProps;
    }

    // Handle standard maps/objects
    const plainObj: Record<string, any> = {};
    for (const key of Object.keys(value)) {
      plainObj[key] = toNative(value[key]);
    }
    return plainObj;
  }

  return value;
}

/**
 * Run a read query in a transaction session
 */
export async function readQuery<T = any>(query: string, params?: Record<string, any>): Promise<T[]> {
  const session = driver.session({ defaultAccessMode: neo4j.session.READ });
  try {
    const result = await session.run(query, params);
    return toNative(result.records.map(record => record.toObject()));
  } finally {
    await session.close();
  }
}

/**
 * Run a write query in a transaction session
 */
export async function writeQuery<T = any>(query: string, params?: Record<string, any>): Promise<T[]> {
  const session = driver.session({ defaultAccessMode: neo4j.session.WRITE });
  try {
    const result = await session.run(query, params);
    return toNative(result.records.map(record => record.toObject()));
  } finally {
    await session.close();
  }
}

/**
 * Initialize Neo4j Multi-tenancy Constraints & Indexes
 */
export async function initNeo4jConstraints(): Promise<void> {
  const queries = [
    `CREATE CONSTRAINT unique_tree_person_id IF NOT EXISTS
     FOR (p:Person) REQUIRE (p.treeId, p.id) IS UNIQUE`,

    `CREATE INDEX person_tree_generation_idx IF NOT EXISTS
     FOR (p:Person) ON (p.treeId, p.generation)`,

    `CREATE INDEX person_tree_name_idx IF NOT EXISTS
     FOR (p:Person) ON (p.treeId, p.full_name)`
  ];

  for (const q of queries) {
    try {
      await writeQuery(q);
    } catch (err) {
      console.warn('Neo4j constraint initialization notice:', err);
    }
  }
}

