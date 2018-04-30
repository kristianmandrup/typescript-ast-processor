try {
  throw new Error('oops')
} catch (err) {
  err
} finally {
  console.log('done')
}
