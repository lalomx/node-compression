const transmit = require("../transmit");
const { brotliDecompressSync } = require("zlib")


describe("transmit.js", () => {
  const str = 'I am about to be compressed! :D'

  test("transmit() - should compress correctly", done => {


    let compressed = null
    const axios = {
      post: async (_, data) => {
        compressed = data
      }
    }
    const callback = () => {
      const decompressed = brotliDecompressSync(compressed).toString()
      expect(str).toStrictEqual(decompressed)

      done()
    }
    transmit(str, null, callback, axios)
  });

  test('axios.post() - should send data', done => {
    const axios = {
      post: jest.fn(async () => { }),
    }

    const callback = () => {
      expect(axios.post.mock.calls.length).toBe(1)

      done()
    }

    transmit(str, null, callback, axios)
  })
});
