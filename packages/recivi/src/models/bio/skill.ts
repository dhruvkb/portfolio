interface FormalSkill {
  /**
   * an identifier for the skill; In implementations, this can be used as a key
   * to find the logo for the skill.
   */
  id: string
  /**
   * the name of the skill
   */
  name: string
  /**
   * a list of skills that are considered as sub-parts of this one
   */
  subSkills?: Skill[]
}

/**
 * a talent possessed by a person; If a skill is not composed of smaller
 * sub-skills, use a plain string.
 * @example
 *   {
 *     "name": "JavaScript",
 *     "subSkills": [
 *       "Vue.js",
 *       {
 *         "name": "React",
 *         "subSkills": [
 *           "Next.js"
 *         ]
 *       }
 *     ]
 *   }
 * @example
 *   "Rust"
 */
export type Skill = FormalSkill | string
