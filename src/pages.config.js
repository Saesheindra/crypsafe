import About from './pages/About';
import Admin from './pages/Admin';
import AdminInventory from './pages/AdminInventory';
import AdminOrders from './pages/AdminOrders';
import AdminShipping from './pages/AdminShipping';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Education from './pages/Education';
import Home from './pages/Home';
import Keystone from './pages/Keystone';
import Legal from './pages/Legal';
import OneKey from './pages/OneKey';
import Payment from './pages/Payment';
import PhysicalGoldSilver from './pages/PhysicalGoldSilver';
import Safety from './pages/Safety';
import Shop from './pages/Shop';
import WalletQuiz from './pages/WalletQuiz';
import Compare from './pages/Compare';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Admin": Admin,
    "AdminInventory": AdminInventory,
    "AdminOrders": AdminOrders,
    "AdminShipping": AdminShipping,
    "Booking": Booking,
    "Contact": Contact,
    "Education": Education,
    "Home": Home,
    "Keystone": Keystone,
    "Legal": Legal,
    "OneKey": OneKey,
    "Payment": Payment,
    "PhysicalGoldSilver": PhysicalGoldSilver,
    "Safety": Safety,
    "Shop": Shop,
    "WalletQuiz": WalletQuiz,
    "Compare": Compare,
    "Checkout": Checkout,
    "MyOrders": MyOrders,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};