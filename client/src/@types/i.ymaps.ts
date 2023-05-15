export interface IGeoCodeResponse{
  response: {
      GeoObjectCollection: {
          featureMember: Array<{
              GeoObject: {
                  metaDataProperty: {
                      GeocoderMetaData: {
                          Address: {
                              Components: Array<{
                                  kind: string,
                                  name: string
                              }>
                          }
                      }
                  }
                  name: string
              }
          }>,
          metaDataProperty: {
              GeocoderResponseMetaData: {
                  found: string,
                  requrest: string,
                  results: string
              }
          }
      }
  }
}


export type IIkkoStreet = {
	id: string, name: string,
	externalRevision: number,
	classifierId: string,
	isDeleted: boolean
}