export class apiResponse {
    constructor(statusCode, data) {
        this.code = statusCode
        this.data = data
        this.status = statusCode < 400 ? "success" : "failed"
    }
}