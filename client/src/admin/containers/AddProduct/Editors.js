import React, { Fragment } from 'react';
import EditorMNCE from '../../components/UI/Editor/Editor';

const Editors = ({
	smallChange,
	smallValue,
	smallLabel,
	smallError,
	change,
	value,
	label,
	error
}) => {
	return (
		<Fragment>
			<EditorMNCE
				change={smallChange}
				value={smallValue}
				init={{
					format: 'html',
					menubar: false,
					statusbar: false,
					toolbar: 'bold italic',
					height: '100px',
					resize: false
				}}
				label={smallLabel}
				error={smallError}
			/>
			<EditorMNCE
				change={change}
				value={value}
				init={{
					statusbar: false,
					plugins:
						'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help',
					toolbar:
						'formatselect | bold italic strikethrough forecolor backcolor formatpainter | link image | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat ',
					height: '600px',
					resize: false
				}}
				label={label}
				error={error}
			/>
		</Fragment>
	);
};

export default Editors;
