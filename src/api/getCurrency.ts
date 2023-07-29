import { CurrencyResponse } from '../types';

export async function getCurrency(): Promise<CurrencyResponse> {
	const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');

	return response.json();
}
