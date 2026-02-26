import { QueryTypes } from 'sequelize'

export function searchProducts () {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let criteria: any = req.query.q ?? ''
      if (criteria === 'undefined') criteria = ''

      criteria = String(criteria).substring(0, 200)

      const likeValue = `%${criteria}%`

      const products = await models.sequelize.query(
        `
        SELECT * FROM Products
        WHERE (
          (name LIKE :criteria OR description LIKE :criteria)
          AND deletedAt IS NULL
        )
        ORDER BY name
        `,
        {
          replacements: { criteria: likeValue },
          type: QueryTypes.SELECT
        }
      )

      for (const product of products as any[]) {
        product.name = req.__(product.name)
        product.description = req.__(product.description)
      }

      res.json(utils.queryResultToJson(products))
    } catch (error: any) {
      next(error)
    }
  }
}