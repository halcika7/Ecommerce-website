import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const EditorMNCE = props => {
	return (
		<div className="form-group">
			<label className="col-12">{props.label}</label>
			<div className="col-12">
				<Editor
					apiKey="zf0abgdeik13s50do5snh722ymmlk7m2on5cfz1s2ip8iuyh"
					init={props.init}
					onPaste={e => props.change(e.currentTarget.innerHTML)}
					onChange={e => props.change(e.target.getContent())}
					onEditorChange={value => props.change(value)}
					value={props.value}
				/>
				{props.error && (
					<div
						style={{
							width: ' 100%',
							marginTop: '0.25rem',
							fontSize: '80%',
							color: '#dc3545'
						}}>
						{props.error}
					</div>
				)}
			</div>
		</div>
	);
};

export default EditorMNCE;
