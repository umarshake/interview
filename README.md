## Get Api for creating a voucher and send them as email.

GET localhost:4000/api/generate/voucher

query string:- email,amount

POSt localhost:4000/api/redeem/voucher
Json Body:-
	email,
	code,
	pin,
	amount


GET localhost:4000/api/voucher/filter

query string;-  email,
				status ['active','expired'],

				generation_start_time: fomat(yyyy-mm-dd) required if end date
				generation_end_time: fomat(yyyy-mm-dd) required if start date

				code : vouchercode
