import { MySQLQueryResult } from '../types/types'
import {Users} from './Users'

describe("Users class", ()=>{
    const usersModel:Users = new Users()

    test("createNewUser function", async ()=>{
        usersModel.createNewUser("test", "pass")
        .then((result: MySQLQueryResult)=>{
            expect(result.affectedRows).toBe(1)
        })
    })

    test("getPasswordFromUsername function", async ()=>{
        usersModel.getPasswordFromUsername("test")
        .then((result: MySQLQueryResult)=>{
            expect(result).toEqual([{password: "pass"}])
        })
    })

    test("deleteUserFromUsername function", async ()=>{
        usersModel._deleteUserFromUsername("test")
        .then((result: MySQLQueryResult)=>{
            expect(result.affectedRows).toBe(1)
        })
    })
})