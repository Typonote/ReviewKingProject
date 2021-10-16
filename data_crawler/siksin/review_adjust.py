from restaurant_review_raw import ss_review_list

siksin_review_list = list()
for name, rating, comment in ss_review_list:
    rating = (
        rating.lstrip("[").rstrip("]").replace("</strong></span>", "").split(">")[-1]
    )
    siksin_review_list.append(
        [
            "siksin",
            name,
            rating,
            comment,
        ]
    )


with open("siksin_restaurant_review.py", "w") as output:
    output.write("siksin_review_list = ")
    output.write(str(siksin_review_list))
