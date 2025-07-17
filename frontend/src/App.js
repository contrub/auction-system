import {BrowserRouter, Route, Routes,} from "react-router-dom";

import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"

import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ForbiddenPage from "./pages/static/ForbiddenPage"
import NotFoundPage from "./pages/static/NotFoundPage"
import Auctions from "./pages/auction/Auctions"
import CreateAuction from "./pages/auction/CreateAuction"
import EditAuction from "./pages/auction/EditAuction"
import AuctionLots from "./pages/lot/AuctionLots";
import CreateLot from "./pages/lot/CreateLot";
import EditLot from "./pages/lot/EditLot";
import Users from "./pages/user/Users";
import User from "./pages/user/User"
import Categories from "./pages/category/Categories";
import CreateCategory from "./pages/category/CreateCategory";
import EditCategory from "./pages/category/EditCategory";
import CreateProposal from "./pages/proposal/CreateProposal";
import LotProposals from "./pages/proposal/LotProposals";
import LotBids from "./pages/bid/LotBids";
import CreateBid from "./pages/bid/CreateBid";
import CreatePayment from "./pages/payment/CreatePayment";
import Stats from "./pages/stats/Stats";

const App = () => {
  return (
    <BrowserRouter>
        <div className="App">
            <Navbar/>
        </div>
        <Routes>
            <Route path="/login" element={ <Login/> }/>
            <Route path="/signup" element={ <SignUp/> }/>
            <Route path="/auctions" element={ <ProtectedRoute element={Auctions}
                                          roles={['participant', 'recruiter', 'admin']} />}/>
            <Route path="/auctions/:auctionID/edit" element={ <ProtectedRoute element={EditAuction}
                                          roles={['admin']}/>}/>
            <Route path="/auctions/new" element={ <ProtectedRoute element={CreateAuction}
                                          roles={['admin']}/>}/>
            <Route path="/auctions/:auctionID/lots" element={ <ProtectedRoute element={AuctionLots}
                                          roles={['participant', 'recruiter', 'admin']} />}/>
            <Route path="/auctions/:auctionID/lots/new" element={ <ProtectedRoute element={CreateLot}
                                          roles={['recruiter', 'admin']} />}/>
            <Route path="/categories" element={ <ProtectedRoute element={Categories}
                                          roles={['recruiter', 'admin']} /> }/>
            <Route path="/categories/new" element={ <ProtectedRoute element={CreateCategory}
                                          roles={['recruiter', 'admin']} /> }/>
            <Route path="/categories/edit/:categoryID" element={ <ProtectedRoute element={EditCategory}
                                          roles={['recruiter', 'admin']} /> }/>
            <Route path="/auctions/:auctionID/lots/:lotID/edit" element={ <ProtectedRoute element={EditLot}
                                          roles={['recruiter', 'admin']} /> }/>
            <Route path="/auctions/:auctionID/lots/:lotID/proposals/new" element={ <ProtectedRoute element={CreateProposal}
                                          roles={['participant', 'recruiter', 'admin']} /> }/>
            <Route path="/auctions/:auctionID/lots/:lotID/proposals" element={ <ProtectedRoute element={LotProposals}
                                          roles={['recruiter', 'admin']} /> }/>
            <Route path="/auctions/:auctionID/lots/:lotID/bids" element={ <ProtectedRoute element={LotBids}
                                          roles={['recruiter', 'admin']} /> }/>
            <Route path="/auctions/:auctionID/lots/:lotID/bids/new" element={ <ProtectedRoute element={CreateBid}
                                          roles={['participant', 'recruiter', 'admin']} /> }/>
            <Route path="/auctions/:auctionID/lots/:lotID/payments/new" element={ <ProtectedRoute element={CreatePayment}
                                          roles={['admin']} /> }/>
            <Route path="/users" element={ <ProtectedRoute element={Users}
                                          roles={['admin']} /> }/>
            <Route path="/users/:userID" element={ <ProtectedRoute element={User}
                                          roles={['admin']} /> }/>
            <Route path="/stats" element={ <ProtectedRoute element={Stats}
                                                                   roles={['admin']} /> }/>
            <Route path="/forbidden" element={ <ForbiddenPage/> }/>
            <Route path="*" element={ <NotFoundPage /> }/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
