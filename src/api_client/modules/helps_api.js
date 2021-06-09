export default {
  async getHelps () {
    const url = `${this.url}/helps`
    const response = await this.get(url, null, null)
    return response.data
  },
}
