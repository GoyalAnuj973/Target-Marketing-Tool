# Generated by Django 4.0.3 on 2022-03-23 06:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('segments', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='segments',
            name='value',
            field=models.CharField( max_length=20),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='segments',
            name='name',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='segments',
            name='type',
            field=models.CharField(max_length=20),
        ),
    ]
