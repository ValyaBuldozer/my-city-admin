const uid = (): number => Math.round((Date.now() + Math.random()) * 1000);
export default uid;