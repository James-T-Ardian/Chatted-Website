import { MySQLQueryResult } from '../types/types'
import {Users} from './Users'

describe("Users class", ()=>{
    const usersModel:Users = new Users()

    test("createNewUser function", ()=>{
        return usersModel.createNewUser("test", "pass")
        .then((result: MySQLQueryResult)=>{
            expect(result.affectedRows).toBe(1)
        })
    })

    test("getPasswordFromUserId function", ()=>{
        return usersModel.getPasswordFromUsername("test")
        .then((result: MySQLQueryResult)=>{
            expect(result).toEqual([{password: "pass"}])
        })
    })

    test("deleteUser function", ()=>{
        return usersModel.deleteUserFromUsername("test")
        .then((result: MySQLQueryResult)=>{
            expect(result.affectedRows).toBe(1)
        })
    })
})