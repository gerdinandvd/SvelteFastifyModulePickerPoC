import type { IModule } from '../interfaces/IModule';

class Module implements IModule {
	constructor(
		public name: string,
		public basic_description: string,
		public type: string,
		public level: string,
		public theme: string,
		public credits: number,
		public keywords: string[],
		public detailed_description?: string // optioneel
	) {}
}

export default Module;
