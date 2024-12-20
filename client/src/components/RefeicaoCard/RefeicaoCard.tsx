import { Rating } from "@mui/material";
import "./RefeicaoCard.css";

type Props = {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string;
	ratings: { userId: string; rating: number }[];
};

const mediaRatings = (ratings: { userId: string; rating: number }[]) => {
	let sum = 0;
	for (let i = 0; i < ratings.length; i++) {
		sum += ratings[i].rating;
	}
	return sum / ratings.length;
};

const RefeicaoCard = (props: Props) => {
	return (
		<div className="refeicao-card-container">
			<div
				className="refeicao-img"
				style={{
					backgroundImage: `url(${props.image})`,
				}}
			></div>

			<div className="refeicao-info-container">
				<p className="r-title">{props.name}</p>
				<p className="r-description">{props.description}</p>
				<div className="r-price-container">
					<p className="r-price">R$ {props.price}</p>
					<div className="r-rating-container">
						<Rating
							name="half-rating"
							defaultValue={mediaRatings(props.ratings)}
							precision={0.5}
							size="small"
							readOnly
						/>{" "}
						({props.ratings.length})
					</div>
				</div>
			</div>
		</div>
	);
};

export default RefeicaoCard;
