import Icon from "@/components/UI/Icon.vue";
import UserIcon from "@/components/UI/UserIcon.vue";
import type {DefineComponent} from "vue";
import ProgressBar from "@/components/UI/ProgressBar.vue";
import DropdownMenu from "@/components/UI/DropdownMenu.vue";
import DropdownBtn from "@/components/UI/DropdownBtn.vue";
import AddForm from "@/components/UI/AddForm.vue";
import Drawer from "@/components/drawer/Drawer.vue";
import DrawerContent from "@/components/drawer/DrawerContent.vue";
import DrawerContainer from "@/components/drawer/DrawerContainer.vue";

export default <Array<DefineComponent>>[
    Icon,
    UserIcon,
    ProgressBar,
    DropdownMenu,
    DropdownBtn,
    AddForm,
    Drawer,
    DrawerContainer,
    DrawerContent,
]