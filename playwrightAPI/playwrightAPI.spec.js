import { test, expect } from "@playwright/test";
import * as endPoint from "./endPoint.json"
import { generatePayload} from "./generatePayoadData";

let objectID

const payload = generatePayload()
test.describe("api get post, put , patch and delete request",()=> {
    test.beforeEach(async({request})=> {
        const response = await request.post(`/${endPoint.object}`, {
            data: payload
        })
        expect(response.status()).toEqual(200)
        const responseText = await response.text()
        const responseJSON = JSON.parse(responseText)
        objectID = responseJSON.id
    })

    test.afterEach(async({request})=> {
        const response = await request.delete(`/${endPoint.object}/${objectID}`)
        expect(response.status()).toEqual(200)
    })

    /**
     * Fetched the object from object id with get Request
     */
    test("Fetched the object detail with get request", async({request})=> {
        const response = await request.get(`/${endPoint.object}/${objectID}`)
        expect(response.status()).toEqual(200)
        const responseText = await response.text()
        const responseJSON = JSON.parse(responseText)
        expect(responseJSON.id).toEqual(objectID)
        expect(responseJSON.name).toEqual(payload.name)
        expect(responseJSON.data.year).toEqual(payload.data.year)
        expect(responseJSON.data.price).toEqual(payload.data.price)
        expect(responseJSON.data.model).toEqual(payload.data.model)
        expect(responseJSON.data.size).toEqual(payload.data.size)
    })

    /**
     * Update the whole object
     */
    test(`Update the whole object and verify object is update or not`, async({request})=> {
        const updatedObject = generatePayload()
        const response = await request.put(`/${endPoint.object}/${objectID}`, {
            data: updatedObject
        })
        expect(response.status()).toEqual(200)
        const responseText = await response.text()
        const responseJSON = JSON.parse(responseText)
        expect(responseJSON.id).toEqual(objectID)
        expect(responseJSON.name).toEqual(updatedObject.name)
        expect(responseJSON.data.year).toEqual(updatedObject.data.year)
        expect(responseJSON.data.price).toEqual(updatedObject.data.price)
        expect(responseJSON.data.model).toEqual(updatedObject.data.model)
        expect(responseJSON.data.size).toEqual(updatedObject.data.size)
    })

     /**
     * Update the one property
     */
     test(`Update the one property of object and verify object is update or not`, async({request})=> {
        const response = await request.patch(`/${endPoint.object}/${objectID}`, {
            data: {
                name: "Test QA"
            }
        })
        expect(response.status()).toEqual(200)
        const responseText = await response.text()
        const responseJSON = JSON.parse(responseText)
        expect(responseJSON.id).toEqual(objectID)
        expect(responseJSON.name).toEqual("Test QA")
        expect(responseJSON.data.year).toEqual(payload.data.year)
        expect(responseJSON.data.price).toEqual(payload.data.price)
        expect(responseJSON.data.model).toEqual(payload.data.model)
        expect(responseJSON.data.size).toEqual(payload.data.size)
    })
})