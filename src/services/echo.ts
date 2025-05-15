import Pusher from "pusher-js";
import Echo, {Broadcaster} from "laravel-echo";
import Cookies from "js-cookie";

const token: string | undefined = Cookies.get("token");

window.Pusher = Pusher;

const echo: Echo<keyof Broadcaster> = new Echo({
    broadcaster: 'reverb',
    key: 'local',
    wsHost: window.location.hostname,
    wsPort: 5000,
    forceTLS: false,
    encrypted: false,
    disableStats: true,
    enabledTransports: ['ws'],
    auth: {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    },
    authEndpoint: '/api/broadcasting/auth',
});

export default echo;