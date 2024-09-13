import styled from 'styled-components';
import { Icon } from '../../../../components';

const SpecialPanelContainer = ({ publishedAt, className, editButton }) => {
	return (
		<div className={className}>
			<div className="publishead-at">
				<Icon
					id="fa-calendar-o"
					size="18px"
					margin="0 8px 0 0"
					onClick={() => {}}
				/>
				{publishedAt}
			</div>
			<div className="buttons">
				{editButton}
				<Icon id="fa-trash-o" size="21px" margin="0 0 0 0" onClick={() => {}} />
			</div>
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin};

	& .published-at {
		display: flex;
		font-size: 18px;
	}

	& .buttons {
		display: flex;
	}

	& i {
		position: relative;
		top: -1px;
	}
`;
