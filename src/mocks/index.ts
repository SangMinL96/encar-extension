export const mockComponent =`import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'app/libs/dayjs';

import classNames from 'classnames/bind';
import styles from './BoardView.module.scss';

const imgServerURL = process.env.REACT_APP_IMG_SERVER;
const cx = classNames.bind(styles);

const BoardView = ({
	pending,
	data,
	listPageActive,
}) => {
	const footer = (
		<div className="footer_area">
			<Link to={'/company/encar-news?page=listPageActive}'} className="btn_list">목록</Link>
		</div>
	);

	if (pending) {
		return (
			<>
				<p className="loading">데이터 로딩중입니다</p>
				{footer}
			</>
		);
	}

	return (
		<>
			{ data ? (
				<>
					<h1 className="tit_content">{data.title.replace('&#65279;', '')}</h1>
					<span className="txt_date">{dayjs(data.reportDate).format('YYYY년MM월DD일')}</span>
					{ data.articleImg && (
						<div className="info_thumb">
							<img src={'imgServerURL}data.articleImg}'} alt="" />
						</div>
					)}
					{/* eslint-disable-next-line react/no-danger */}
					<div className="content" dangerouslySetInnerHTML={{ __html: data.content }} />
					{ data.originNm && (
						<div className="citation">
							기사원문: <a href={data.originNm} target="_blank" rel="noopener noreferrer">{data.originNm}</a>
						</div>
					)}
				</>
			) : (
				<div className="none">데이터가 없습니다</div>
			)}
			{footer}
		</>
	);
};

BoardView.propTypes = {
	data: PropTypes.object,
	listPageActive: PropTypes.number,
	pending: PropTypes.bool,
};

BoardView.defaultProps = {
	data: {},
	listPageActive: null,
	pending: false,
};

export default BoardView;
`;