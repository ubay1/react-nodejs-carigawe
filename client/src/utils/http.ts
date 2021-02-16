/* eslint-disable @typescript-eslint/no-unused-vars */
import Axios from "axios";
import { AxiosNormal, DevUrl, DevApiUrl } from "./helper";
import { registerUser} from './interface';

export async function HTTPRegisterUser(param: registerUser): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const data = {
                name: param.name,
                phone: param.phone,
                email: param.email,
                password: param.password,
                recruiter: param.roles_jobs === 'recruiter' ? true : false,
                job_seeker: param.roles_jobs === 'recruiter' ? false : true
            }
            const responseRegisterUser = await AxiosNormal(2000).post(`${DevApiUrl}/user/signup`, data)
            return resolve(responseRegisterUser)
        } catch (error) {
            return reject(error)
        }
    })
}

export async function HTTPLoginUser(param: {email: string, password: string}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const data = {
                email: param.email,
                password: param.password,
            }
            const responseLoginUser = await AxiosNormal(2000).post(`${DevApiUrl}/user/signin`, data)
            return resolve(responseLoginUser)
        } catch (error) {
            return reject(error)
        }
    })
}

export async function HTTPCheckToken(param: {token: string}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const data = {
                token: param.token
            }
            const responseCheckToken = await AxiosNormal(2000).post(`${DevApiUrl}/user/check_token`, data)
            return resolve(responseCheckToken)
        } catch (error) {
            return reject(error)
        }
    })
}

export async function HTTPGetUser(param: {token: string}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const data = {
                token: param.token
            }
            const responseGetUser = await AxiosNormal(2000).post(`${DevApiUrl}/user/get_user`, data)
            return resolve(responseGetUser)
        } catch (error) {
            return reject(error)
        }
    })
}

//################################ Recruiter ################################//
export async function HTTPGetAllJob(): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const responseGetAllJob = await AxiosNormal(10000).get(`${DevApiUrl}/recruiter/get_all_post_job`)
            return resolve(responseGetAllJob)
        } catch (error) {
            return reject(error)
        }
    })
}

export async function HTTPGetAllJobUser(param: {token: string}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const data = {
                token: param.token
            }
            const responseGetAllJobUser = await AxiosNormal(10000).post(`${DevApiUrl}/recruiter/get_all_post_job_user`, data)
            return resolve(responseGetAllJobUser)
        } catch (error) {
            return reject(error)
        }
    })
}

export async function HTTPPostJob(
    param: {
        token: string, 
        title: string,
        image_content: string,
        city: string,
        content: string,
        expiredAt: string,
    }): Promise<any> 
    {
    return new Promise(async (resolve, reject) => {
        try {
            const data = {
                token: param.token,
                title: param.title,
                image_content: param.image_content,
                city: param.city,
                content: param.content,
                expiredAt: param.expiredAt,
            }
            const responsePostJob = await AxiosNormal(2000).post(`${DevApiUrl}/recruiter/post_job`, data)
            return resolve(responsePostJob)
        } catch (error) {
            return reject(error)
        }
    })
}
//################################ Recruiter ################################//