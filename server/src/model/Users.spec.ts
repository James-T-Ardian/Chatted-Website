import { MySQLQueryResult } from '../types/types'
import {Users} from './Users'

describe("Users class", ()=>{

    const usersModel:Users = new Users()

    test("createNewUser function", async ()=>{
        let result: MySQLQueryResult = await usersModel.createNewUser("test", "pass")
        expect(result.affectedRows).toBe(1)
    })

    test("getPasswordFromUsername function", async ()=>{
        let result: MySQLQueryResult = await usersModel.getPasswordFromUsername("test")
        expect(result).toEqual([{password: "pass"}])
    })

    test("deleteUserFromUsername function", async ()=>{
        let result: MySQLQueryResult = await usersModel._deleteUserFromUsername("test")
        expect(result.affectedRows).toBe(1)
    })
})