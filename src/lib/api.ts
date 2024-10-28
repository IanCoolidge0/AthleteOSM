import { env } from '$env/dynamic/private';
import type { ActivityStats, StravaSession, SummaryActivity } from "./types";

export const getStravaRedirectURI = () => {
    const prefix = (env.NODE_ENV === 'development') ? 'http://localhost:5173' : 'https://athlete-osm.vercel.app';
    return `${prefix}/auth/redirect`;
}

export const getStravaAuthorizeURI = (redirectUri: string, scopes: string[], force?: boolean) => {
    let url = `https://strava.com/oauth/authorize`;
    url = `${url}?client_id=${env.STRAVA_CLIENT_ID}`;
    url = `${url}&redirect_uri=${redirectUri}`;
    url = `${url}&response_type=code`;
    url = `${url}&approval_prompt=${force ? 'force' : 'auto'}`;
    url = `${url}&scope=${scopes.join(`,`)}`;
    return url;
}

export const getStravaSession = async (code: string, grantType: 'authorization_code' | 'refresh_token') => {
    let url = `https://strava.com/api/v3/oauth/token`;
    url = `${url}?client_id=${env.STRAVA_CLIENT_ID}`;
    url = `${url}&client_secret=${env.STRAVA_CLIENT_SECRET}`;
    url = `${url}&grant_type=${grantType}`;
    url = `${url}&${grantType === 'authorization_code' ? 'code' : 'refresh_token'}=${code}`;
    const response = await fetch(url, {
        method: 'POST'
    });
    return await response.json() as StravaSession;
}

export const getStravaAthleteStats = async (access_token: string, athlete_id: number) => {
    let url = `https://strava.com/api/v3/athletes/${athlete_id}/stats`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });
    return await response.json() as ActivityStats;
}

export const getStravaAthleteActivities = async (access_token: string) => {
    let url = `https://strava.com/api/v3/athlete/activities?per_page=60`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });
    return await response.json() as SummaryActivity[];
}