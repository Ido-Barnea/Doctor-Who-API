class QueryResponse {
  constructor(response, code, error) {
      this.response = response;
      this.code = code;
      this.error = error;
  }
}

function validateQuery(jsonDict, query) {
  const availableFilteringKeys = ['name', 'status', 'species', 'gender', 'placeOfOrigin', 'relationsWithTheDoctor'];
  const objectsFieldsKeys = ['species', 'placeOfOrigin'];

  for (let key in query) {
      if (key in jsonDict && availableFilteringKeys.includes(key)) {
          let jsonValue = jsonDict[key];

          const isValueAnObject = objectsFieldsKeys.includes(key);
          if (isValueAnObject) {
            jsonValue = jsonValue['name'];
          }

          if (jsonValue.toLowerCase() != query[key].toLowerCase()) {
            return new QueryResponse(false, null, null);
          }
      } else {
          // Return false and Bad Request error code if key doesn't exist.
          return new QueryResponse(false, 400, 'Unknown Filter.');
      }
  }

  // Found a match.
  return new QueryResponse(true, null, null);
}

module.exports = validateQuery;
