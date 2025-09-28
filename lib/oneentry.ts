import retriveRefreshToken from "@/actions/auth/retrieveRefreshToken";
import storeRefreshToken from "@/actions/auth/storeRefreshToken";
import { defineOneEntry } from "oneentry";


export type ApiClientType = ReturnType<typeof defineOneEntry> | null;

let apiClient: ApiClientType = null;


async function setupApiClient(): Promise<ReturnType<typeof defineOneEntry>> {
    const apiUrl = process.env.PROJECTID_URL;

    if(!apiUrl)
    {
        throw new Error('PROJECT ID URL IS MISSING');
    }

    if(!apiClient)
    {
        try{
            const refreshToken = await retriveRefreshToken();
            apiClient = defineOneEntry(apiUrl,{token:process.env.ONEENTRY_TOKEN,langCode: 'en_US',
                auth:{refreshToken:refreshToken|| undefined,customAuth:false,
                    saveFunction:async (newToken: string)=>{await storeRefreshToken(newToken);},},});
        }
        catch(error){
            console.error('Error fetching refresh Token',error);
        }
    }
    if(!apiClient)
    {
        throw new Error('Failed to initialize API client');
    }
    return apiClient;

}

export async function fetchApiClient():Promise<ReturnType<typeof defineOneEntry>>{
    if(!apiClient)
    {
        await setupApiClient();
    }
    if(!apiClient)
    {
        throw new Error('Api client is still null after setting up');
    }
    return apiClient;
}