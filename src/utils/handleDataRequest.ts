import { Request, Response } from 'express';
import { validateQuery } from './validateQuery';

export function handleDataRequest(req: Request, res: Response, json: any[]) {
  const query = req.query;
  let isValid = true;
  const filteredJSON = json.filter(item => {
    const validationResponse = validateQuery(item, query);
    if (validationResponse.code) {
      isValid = false;
      res.status(validationResponse.code).json(validationResponse.error);
    }

    return validationResponse.response;
  });

  if (isValid) res.status(200).json(filteredJSON);
}

export default handleDataRequest;
