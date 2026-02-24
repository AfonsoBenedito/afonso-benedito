.PHONY: local-up local-down build-test code-check-web code-fix-web run-all-tests

local-up:
	npm run dev & echo $$! > .dev.pid
	@echo "Dev server started (PID: $$(cat .dev.pid))"

local-down:
	@if [ -f .dev.pid ]; then \
		kill $$(cat .dev.pid) && rm .dev.pid && echo "Dev server stopped"; \
	else \
		echo "No dev server running"; \
	fi

build-test:
	npm run build

code-check-web:
	npx tsc --noEmit && npm run lint

code-fix-web:
	npx eslint . --fix

run-all-tests: code-check-web build-test
	@echo "All tests passed"
