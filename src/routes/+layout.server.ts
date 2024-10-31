import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types"
import { getStravaAthleteActivities, getStravaAthleteStats } from "$lib/api";
import type { PageServerLoad } from "./auth/signin/$types";
import polyline from '@mapbox/polyline';

export const load: LayoutServerLoad = async (event) => {
    if (!event.locals.access_token) {
        if (!event.url.pathname.startsWith('/auth')) {
            return redirect(302, '/auth/login');
        } else {
            return {};
        }
    }


    const stats = await getStravaAthleteStats(event.locals.access_token, event.locals.user_id);
    const activities = await getStravaAthleteActivities(event.locals.access_token);
    const polylines = activities.map((activity) => polyline.decode(activity.map.summary_polyline!));
    return {
        username: event.locals.username,
        userid: event.locals.user_id,
        profile: event.locals.profile,
        access_token: event.locals.access_token,
        stats,
        polylines
    };
} 