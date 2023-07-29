export interface CurrencyResponse {
	Date: string;
	PreviousDate: string;
	PreviousURL: string;
	Timestamp: string;
	Valute: Valute;
}

type CurrencyType = {
	ID: string;
	NumCode: string;
	CharCode: string;
	Nominal: number;
	Name: string;
	Value: number;
	Previous: number;
};

type Valute = Record<string, CurrencyType>;
