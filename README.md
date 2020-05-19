## Get Api for creating a voucher and send them as email.

GET localhost:4000/user/generate/voucher

query string:- email,amount

POSt localhost:4000/user/redeem/voucher
Json Body:-
	email,
	code,
	pin,
	amount

