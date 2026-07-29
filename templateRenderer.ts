export interface OutputTemplateContext {
	path: string;
	name: string;
	folder: string;
	extension: string;
	index: number;
	prefix?: string;
	content?: string;
}

export function renderTemplate(template: string, context: OutputTemplateContext): string {
	return template.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (_match, placeholder: string) => {
		const values: Record<string, string | number | undefined> = {
			path: context.path,
			name: context.name,
			folder: context.folder,
			extension: context.extension,
			index: context.index,
			prefix: context.prefix,
			content: context.content,
		};

		if (Object.prototype.hasOwnProperty.call(values, placeholder)) {
			const value = values[placeholder];
			return value === undefined ? `{{${placeholder}}}` : String(value);
		}

		return `{{${placeholder}}}`;
	});
}
