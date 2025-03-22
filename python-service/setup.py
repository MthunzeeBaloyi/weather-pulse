from setuptools import setup, find_packages

setup(
    name="weather_pulse",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "pytest",
        "pytest-cov"
    ]
)
