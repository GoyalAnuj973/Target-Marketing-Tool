# Generated by Django 4.0.3 on 2022-04-11 13:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaigns', '0002_alter_campaigns_name_alter_campaigns_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campaigns',
            name='msg',
            field=models.CharField(max_length=256),
        ),
        migrations.AlterField(
            model_name='campaigns',
            name='name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='campaigns',
            name='type',
            field=models.CharField(max_length=30),
        ),
    ]
