import { Controller } from "@/presentation/protocols";

export const adaptRoute = (controller: Controller) => {
  return async (req, res) => {
    const httpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}