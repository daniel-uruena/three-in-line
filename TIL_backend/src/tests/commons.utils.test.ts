import { isValidUUID } from "../commons/utils";

describe('Utilities tests', () => {
  describe('#isValidUUID', () => {
    test('should return true when receive a valid uuid', () => {
      const result = isValidUUID('11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000')

      expect(result).toBeTruthy()
    })

    test('should return false when receive an invalid uuid', () => {
      const result = isValidUUID('invalidUUID')

      expect(result).toBeFalsy()
    })
  })
})
