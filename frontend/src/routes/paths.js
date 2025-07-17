const paths = {
    home: '/',
    login: '/login',
    signup: '/signup',

    auctions: '/auctions',
    auction: (auctionID) => `/auctions/${auctionID}`,
    createAuction: '/auctions/new',
    editAuction: (auctionID) => `/auctions/${auctionID}/edit`,

    auctionLots: (auctionID) => `/auctions/${auctionID}/lots`,
    lotEdit: (auctionID, lotID) => `/auctions/${auctionID}/lots/${lotID}/edit`,
    lotCreate: (auctionID) => `/auctions/${auctionID}/lots/new`,

    proposalCreate: (auctionID, lotID) => `/auctions/${auctionID}/lots/${lotID}/proposals/new`,
    proposalsLot: (auctionID, lotID) => `/auctions/${auctionID}/lots/${lotID}/proposals`,

    lotBids: (auctionID, lotID) => `/auctions/${auctionID}/lots/${lotID}/bids`,
    createBid: (auctionID, lotID) => `/auctions/${auctionID}/lots/${lotID}/bids/new`,

    createPayment: (auctionID, lotID) => `/auctions/${auctionID}/lots/${lotID}/payments/new`,

    categories: '/categories',
    createCategory: '/categories/new',
    editCategory: (categoryID) => `/categories/edit/${categoryID}`,

    users: '/users',
    editUser: (userID) => `/users/${userID}`,

    stats: '/stats',

    forbidden: '/forbidden',
};

export default paths;
