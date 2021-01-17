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
                recruiter: param.recruiter,
                job_seeker: param.job_seeker
            }
            const responseRegisterUser = await AxiosNormal(2000).post(`${DevApiUrl}/user/signup`, data)
            return resolve(responseRegisterUser)
        } catch (error) {
            return reject(error)
        }
    })
}