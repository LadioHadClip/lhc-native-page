<!-- omit in toc -->
# Tube Analyzer Simple <!-- omit in toc -->

- [Pre-requisites](#pre-requisites)
- [Pipeline (corresponding codes haven't been updated completely yet)](#pipeline-corresponding-codes-havent-been-updated-completely-yet)
- [Components](#components)
  - [Loaders](#loaders)
  - [Schedules](#schedules)
  - [Models](#models)
  - [Utils](#utils)
- [Customization](#customization)
  - [Data](#data)
  - [Schedule](#schedule)
  - [Model](#model)
  - [Tools](#tools)
- [Small Tips](#small-tips)
  - [Ipython Kernel Install](#ipython-kernel-install)


##  Pre-requisites

- Python 3.6
- PyTorch 1.0+ (1.0.1 used thus recommended)
- OpenCV 3.4+ (actually not limited, as only *VideoCapture* and *VideoWriter* are used, as well as some common image processing functions.)
- SciPy & NumPy
- Scikit-Learn
- Python Fire as cli-parser
- (optional) DeepLabCut

As the whole codebase is originally built on [**DeepLabCut**](https://github.com/AlexEMG/DeepLabCut) toolbox, it's better to have it installed. However, the core part of the analyzer is independent of **DeepLabCut**, as long as custom dataloader is provided in convention (see **Customization**).

Some other packages, e.g. **h5py**, might be well installed after above ones have been successfully installed.


## Pipeline (corresponding codes haven't been updated completely yet)

1. (pre-requisites) Pre-processed keypoint data from DeepLabCut, or some other pre-computer video feature representation.
2. Transform original data to required format with **utils/transform_dlc.py** if it's DeepLabCut generated, or manually transform with customized script.
3. Modify **config.py**.
4. Data Loading with pre-defined loader, or customized loader. With pre-defined loader, it's recommended to have the following structure (if it's DeepLabCut data and has been successfully transformed, you'll see such structure),
    ```
    -- BASE
        -- server
            -- *.borisfd (action ground-truth)
            -- *_region (region cropped info)
            -- *.json (specific mapping)
            -- *.hdf5 (DeepLabCut generated data, need transformation by utils/dlc_transform.py)
            ...
        -- raw_video
            ...
        ...
    ```
5. After Loading, use **core.py** to train/test on batch data.
6. For further analysis, refer to **./tubeAnalyzerSimple/utils**.
7. (optional) If DeepLabCut is installed, refer to **dlc_pipeline.py** to generate prediction for a single video, with some special configuration.


## Components

### Loaders

...

### Schedules

...

### Models

...

### Utils

...


## Customization

### Data

...

### Schedule

...

### Model

...

### Tools

...


## Small Tips

### Ipython Kernel Install

If you want to use whole environment in jupyter-notebook, just remember to register the kernel as the following

```Bash
python -m ipykernel install [--user] [--name <machine-readable-name>] [--display-name <"User Friendly Name">]

# python -m ipykernel install --user --name tubeasim --display-name "TubeAnalyzerSimple (testenv)"
```