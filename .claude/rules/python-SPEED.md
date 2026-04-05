# Python SPEED Engineering Standards

Synechron SPEED enterprise Python guidelines. Apply these in addition to `python.md`.

Source: `https://backstage.synechron.com/docs/default/component/speed-engineering-guidelines/python/` — Synechron SPEED Engineering Guidelines.

## Clean Code

- Follow PEP 8 for indentation, whitespace, and line length. Enforce with a linter (`ruff`).
- Replace magic numbers with named constants or module-level variables (`PI = 3.14`, `MAX_RETRIES = 3`).
- Minimise global variables. Pass values as function arguments — functions must be self-contained and testable.
- Avoid unnecessary nesting. Refactor nested loops into list comprehensions, generator expressions, or helper functions.
- Apply SOLID principles:
  - **SRP** — each class/function has a single responsibility.
  - **OCP** — open for extension, closed for modification.
  - **LSP** — subtypes must be substitutable for base types.
  - **ISP** — prefer small, focused interfaces over large ones.
  - **DIP** — depend on abstractions, not concrete implementations.
- Use `dataclasses` or `pydantic` to model domain objects — avoid raw dicts or monolithic functions that mix concerns.

## Efficient Code

- Choose appropriate data structures: sets/dicts for O(1) lookups, lists for ordered collections, built-in `sorted()` (Timsort) for sorting.
- Use list comprehensions for concise, readable list operations. Avoid overly complex comprehensions — fall back to explicit loops when readability suffers.
- Use generator expressions for large datasets to avoid materialising full lists in memory (`sum(x**2 for x in data)` not `sum([x**2 for x in data])`).
- Avoid redundant calculations. Store intermediate results in variables rather than recomputing.
- Use lazy evaluation with generators for potentially infinite or very large sequences.

## Scalable Code

- Organise code into logical modules and packages. Group related functionality together.
- Avoid hardcoding. Use configuration files or environment variables for parameters that may change.
- Apply design patterns where appropriate:
  - **Singleton** — single-instance resources (connection pools, config).
  - **Factory** — object creation without specifying concrete classes.
  - **Observer** — event-driven, one-to-many dependency notification.
- Implement caching for frequently accessed data (`functools.lru_cache`, Redis, etc.).
- Use `asyncio` for high-concurrency I/O-bound workloads. Use `multiprocessing` or `concurrent.futures` for CPU-bound parallelism.
- Select scalable data storage appropriate to the workload (relational, NoSQL, object storage).
- Design for load balancing — distribute workloads evenly across resources.

## Defensive Code

- Validate all user input and function arguments at trust boundaries.
- Use `try`/`except` blocks to handle exceptions gracefully. Catch specific exceptions, not bare `except`.
- Use assertions for invariants during development (`assert balance >= 0`).
- Implement structured logging (`logging` module) for debugging and production troubleshooting.
- Design for graceful degradation — provide fallback mechanisms when components fail.

## Secure Code

- Sanitise all input data to prevent SQL injection, XSS, and other injection attacks.
- Implement proper authentication and authorisation mechanisms.
- Use relative file paths and validate all file paths to prevent path traversal attacks.
- Store passwords using secure hashing (e.g. `bcrypt`, `argon2`). Never store plaintext credentials.
- Conduct regular security audits and update dependencies to address new vulnerabilities.

## Documentation

- Use inline comments sparingly — explain _why_, not _what_. Avoid stating the obvious.
- Write docstrings for all public modules, classes, and functions. Include parameter descriptions and return values.
- Use a consistent docstring style (Google-style recommended).
- Provide external documentation (README, wiki) for project-level overviews, installation, and usage guides.
- Include usage examples in docstrings or a dedicated `examples/` directory.
- Update documentation alongside code changes — outdated docs are worse than no docs.
- Use descriptive variable and function names that convey purpose
  (`calculate_tax` not `calc`, and `user_email` not `ue`).
- Include module-level docstrings describing the module's purpose.

## Publishing & CI/CD

- Organise code into logical modules and packages with meaningful names.
- Git is used for version control. Avoid committing binaries or generated artifacts.
- Use conventional commit messages and branch names.
- Ensure comprehensive test coverage: unit tests, integration tests, in automated CI.
- Include a README with installation and usage instructions.
- Use a package manager (`uv`) with pinned dependencies in `pyproject.toml`
- Deploy automatically to a lower environment recommended on successful test completion.
- a pipeline must be created in the source control platform, eg GitHub Workflow.

## GenAI Code

When writing Python code that interacts with LLMs or GenAI services:

- Use f-strings or Jinja2 templates for prompt construction — never string concatenation.
- Store prompt templates in dictionaries or configuration for dynamic, context-based retrieval.
- Write automated tests (`pytest`) for prompt outputs — validate format, expected keywords, and data types.
- Use `unittest.mock` to mock LLM API responses in tests —
  avoid real API calls in CI to reduce cost and ensure determinism.
- Annotate GenAI-specific code with comments highlighting:
  - Token limits and input size constraints.
  - API rate limits and retry/backoff strategies.
  - Model-specific behaviours and known limitations.
- Handle API errors explicitly: timeouts, rate limits, invalid responses. Raise meaningful exceptions.
- Validate LLM response structure before processing — check for error fields and unexpected formats.
