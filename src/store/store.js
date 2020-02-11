import { writable } from 'svelte/store';

import { Themes } from '../constants';

export const currentTheme = writable(Themes.DARK);

export const Todos = writable([]);
