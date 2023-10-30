# Makefile

setup:
	@echo "Creating virtual environment in .venv directory..."
	python3 -m venv .venv
	@echo "Activating virtual environment..."
	source .venv/bin/activate
	@echo "Virtual environment setup completed."

server: setup
	source .venv/bin/activate; python -m http.server 8000

clean:
	@echo "Removing virtual environment..."
	rm -rf .venv
	@echo "Cleaned up."
