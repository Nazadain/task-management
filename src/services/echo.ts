import Pusher from "pusher-js";
import Echo, {Broadcaster} from "laravel-echo";
import Cookies from "js-cookie";

const token: string | undefined = Cookies.get("token");

window.Pusher = Pusher;

const echo: Echo<keyof Broadcaster> = new Echo({
    broadcaster: 'reverb',
    key: 'tqokhe1voqkvz3c4mkpu',
    wsHost: "localhost",
    wsPort: 6001,
    forceTLS: false,
    encrypted: false,
    disableStats: true,
    enabledTransports: ['ws'],
    auth: {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    },
    authEndpoint: 'http://localhost:8000/api/broadcasting/auth',
});

export default echo;