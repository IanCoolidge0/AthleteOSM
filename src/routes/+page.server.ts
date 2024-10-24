import { getStravaAthleteActivities, getStravaAthleteStats } from "$lib/api";
import type { PageServerLoad } from "./auth/signin/$types";
import polyline from '@mapbox/polyline';

export const load: PageServerLoad = async (event) => {
    const stats = await getStravaAthleteStats(event.locals.access_token, event.locals.user_id);
    const activities = await getStravaAthleteActivities(event.locals.access_token);
    const polylines = activities.map((activity) => polyline.decode(activity.map.summary_polyline!));
    return {
        username: event.locals.username,
        profile: event.locals.profile,
        access_token: event.locals.access_token,
        stats,
        polylines
    };
}