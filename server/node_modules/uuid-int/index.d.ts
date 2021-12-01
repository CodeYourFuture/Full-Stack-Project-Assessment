export as namespace uuidInt;

export = UUID;

/**
 * uuid对象
 * @param id machine unique id
 * @param seed time seed
 */
declare function UUID(id: number, seed: number): UUID.Generator;
/**
 * uuid对象
 * @param id machine unique id
 */
declare function UUID(id: number): UUID.Generator;

declare namespace UUID {
  export interface Generator {
    /**
     * machine unique id
     */
    id: number;
    /**
     * time seed
     */
    seed: number;
    /**
     * generate unique int53
     */
    uuid(): number;
  }
}
