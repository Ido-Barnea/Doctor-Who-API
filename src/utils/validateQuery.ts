class QueryResponse {
  response: boolean;
  code: number | null;
  error: string | null;

  constructor(response: boolean, code: number | null, error: string | null) {
    this.response = response;
    this.code = code;
    this.error = error;
  }
}

export function validateQuery(jsonDict: any, query: any): QueryResponse {
  const availableFilteringKeys = ['name', 'status', 'species', 'gender', 'placeOfOrigin', 'relationsWithTheDoctor'];
  const dictionaryFieldsKeys = ['species', 'placeOfOrigin'];

  for (const key in query) {
    if (key in jsonDict && availableFilteringKeys.includes(key)) {
      let jsonValue = jsonDict[key];
      // If key value is a dictionary.
      if (dictionaryFieldsKeys.includes(key)) jsonValue = jsonValue['name'];
      // If json value doesn't match query value
      if (jsonValue.toLowerCase() != query[key].toLowerCase()) return new QueryResponse(false, null, null);
    } else {
      // Return false and Bad Request error code if key doesn't exist.
      return new QueryResponse(false, 400, 'Unknown Filter.');
    }
  }

  // Found a match.
  return new QueryResponse(true, null, null);
}
