const validate = async (result, ipfs) => {
  const uploadedFiles = window.uploadedFiles || false
  const expectedResult = []

  for await (const result of ipfs.add(window.uploadedFiles)) {
    expectedResult.push(result)
  }

  if (!result) {
    return {
      fail: 'Oops! You forgot to return a result :('
    }
  }

  if (result.error) {
    return { error: result.error }
  }

  if (!Array.isArray(result)) {
    return {
      fail: 'The returned value should be an array.'
    }
  }

  if (result.length > uploadedFiles.length) {
    return {
      fail: 'The array you returned has more items than the number of files you uploaded. Be sure to add each file to IPFS just once, which you can do most easily by passing the whole array to the `add` method.'
    }
  }

  if (result.length < uploadedFiles.length) {
    return {
      fail: 'The array you returned has fewer items than the number of files you uploaded. Be sure to add each file to IPFS, which you can do most easily by passing the whole array to the `add` method.'
    }
  }

  const fileText = result.length > 1 ? `these files` : 'this file'
  const valueText = result.length > 1 ? `values` : 'value'
  const thatText = result.length > 1 ? `them` : 'it'

  if (JSON.stringify(expectedResult) === JSON.stringify(result)) {
    return {
      success: 'Success! You did it!',
      logDesc: 'Your `add` command returned the array of objects below. Notice in particular the `hash` ' + valueText + ", since we'll need " + thatText + ' to access ' + fileText + ' again later. The `path` matches the `hash` for ' + fileText + ", but we'll see in future lessons that that's not always true.",
      log: result
    }
  } else {
    return { fail: `Something seems to be wrong. Please click "Reset Code" and try again, taking another look at the instructions and editing only the portion of code indicated. Feeling really stuck? You can click "View Solution" to see our suggested code.` }
  }
}

const code = `/* global ipfs */
const run = async (files) => {
  const result = []

  for await (const resultPart of ) {
    // Place your code to add a file or files here and on the for await of loop
  }

  return result
}
return run
`

const solution = `/* global ipfs */
const run = async (files) => {
  const result = []

  for await (const resultPart of ipfs.add(files)) {
    result.push(resultPart)
  }

  return result
}
return run
`

const modules = { cids: require('cids') }

const options = {
  overrideErrors: true
}

export default {
  validate,
  code,
  solution,
  modules,
  options
}
