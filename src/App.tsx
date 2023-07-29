import { useQuery } from 'react-query';
import { ChangeEvent, useMemo, useState } from 'react';

import { getCurrency } from './api/getCurrency';
import { fixNumber } from './utils/fixNumber';

import styles from './App.module.css';

import { CurrencyResponse } from './types';

const DEFAULT_CURRENCY = 'USD';

function App() {
	const { data, isLoading, isError } = useQuery<CurrencyResponse>(
		'get-currency',
		() => getCurrency()
	);

	const [inputValue, setInputValue] = useState<string>('1');
	const [currentCurrency, setCurrentCurrency] =
		useState<string>(DEFAULT_CURRENCY);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;

		setInputValue(value);
	};

	const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target;

		setCurrentCurrency(value);
	};

	const currencyOptions = data && Object.values(data.Valute);
	const nominal = data?.Valute[currentCurrency]?.Nominal;
	const currencyValue = data?.Valute[currentCurrency]?.Value;

	const currencyAmount = useMemo(() => {
		if (data && nominal && currencyValue) {
			return nominal < 1
				? currencyValue * +inputValue
				: (currencyValue * +inputValue) / nominal;
		}
	}, [currencyValue, data, inputValue, nominal]);

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<h1 className={styles.title}>Конвертер валют</h1>
				<div className={styles.currencyBlock}>
					<div className={styles.inputBlock}>
						<input
							className={styles.input}
							value={inputValue}
							onChange={handleChange}
							type="number"
						/>
					</div>
					{isLoading && <p>Loading...</p>}
					{!isLoading && data && (
						<>
							<select
								className={styles.select}
								value={currentCurrency}
								onChange={handleChangeSelect}
							>
								{currencyOptions &&
									currencyOptions.map((valute) => (
										<option key={valute.ID} value={valute.CharCode}>
											{valute.Name}
										</option>
									))}
							</select>
							<div className={styles.resultBlock}>
								<div className={styles.result}>
									{currencyAmount && fixNumber(currencyAmount)}
								</div>

								<span className={styles.resultCurrency}>₽</span>
							</div>
						</>
					)}
					{isError && <p>Что то пошло не так :(...</p>}
				</div>
			</div>
		</main>
	);
}

export default App;
